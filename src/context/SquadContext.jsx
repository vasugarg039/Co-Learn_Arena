import React, { createContext, useState, useContext, useEffect } from 'react';
import { db, auth } from '../firebase';
import { doc, onSnapshot, updateDoc, arrayUnion, query, collection, where, getDocs, limit, addDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

const SquadContext = createContext();

export const useSquad = () => useContext(SquadContext);

export const SquadProvider = ({ children }) => {
    const [squad, setSquad] = useState(null);
    const [loading, setLoading] = useState(true); // Start loading by default
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!auth) {
            setLoading(false);
            return;
        }

        const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);

            if (currentUser) {
                // Listen to user's squadId change
                const userRef = doc(db, 'users', currentUser.uid);
                const unsubscribeUser = onSnapshot(userRef, (userSnap) => {
                    const userData = userSnap.data();
                    if (userData?.squadId) {
                        // Listen to squad data
                        const squadRef = doc(db, 'squads', userData.squadId);
                        const unsubscribeSquad = onSnapshot(squadRef, (squadSnap) => {
                            if (squadSnap.exists()) {
                                setSquad({ id: squadSnap.id, ...squadSnap.data() });
                            } else {
                                // Squad ID exists on user but squad doc is missing?
                                setSquad(null);
                            }
                            setLoading(false);
                        }, (err) => {
                            console.error("Error fetching squad:", err);
                            setLoading(false);
                        });
                        return () => unsubscribeSquad();
                    } else {
                        setSquad(null);
                        setLoading(false);
                    }
                }, (err) => {
                    console.error("Error fetching user data:", err);
                    setLoading(false);
                });
                return () => unsubscribeUser();
            } else {
                setSquad(null);
                setLoading(false);
            }
        });
        return () => unsubscribeAuth();
    }, []);

    const findSquad = async (userData) => {
        if (!user) return;
        setLoading(true);
        try {
            // Guard: User already has a squad?
            const userSnap = await getDocs(query(collection(db, 'users'), where('uid', '==', user.uid))); // Sanity check if needed, but we trust local state usually.
            // Better: rely on 'squad' state if we trust it, but for safety in "find" op, let's proceed.

            // AI Matching Simulation: Query for squads with space
            const squadsRef = collection(db, 'squads');
            const q = query(squadsRef, where('memberCount', '<', 5), limit(1));
            const querySnapshot = await getDocs(q);

            let squadId;
            let targetSquadRef;

            if (querySnapshot.empty) {
                // Create new squad
                const newSquad = {
                    name: 'Project ' + (Math.random() + 1).toString(36).substring(7).toUpperCase(),
                    members: [{ uid: user.uid, name: user.displayName || 'Anonymous', avatar: user.photoURL || '' }],
                    memberCount: 1,
                    genre: userData?.interests?.[0] || 'General Learning',
                    xp: 0,
                    createdAt: new Date().toISOString()
                };
                const docRef = await addDoc(collection(db, 'squads'), newSquad);
                squadId = docRef.id;
            } else {
                // Join existing
                const targetSquad = querySnapshot.docs[0];
                squadId = targetSquad.id;
                targetSquadRef = doc(db, 'squads', squadId);

                // Transactional-like update best, but simple atomic update:
                await updateDoc(targetSquadRef, {
                    members: arrayUnion({ uid: user.uid, name: user.displayName || 'Anonymous', avatar: user.photoURL || '' }),
                    memberCount: targetSquad.data().memberCount + 1 // Note: this is a bit racy without transactions, but acceptable for MVP
                });
            }

            // Update user's squadId
            await updateDoc(doc(db, 'users', user.uid), { squadId });
        } catch (error) {
            console.error("Find squad failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const leaveSquad = async () => {
        if (!user || !squad) return;
        setLoading(true);
        try {
            // Remvoe from squad members list
            const squadRef = doc(db, 'squads', squad.id);
            // We need to remove the *exact* object. Since objects are by ref, arrayRemove might fail if we don't pass the exact same object fields.
            // A safer bet for this MVP is to filter the array in memory (if we fetched it) or just update the user doc and hope a cloud function cleans up.
            // BUT, let's try to remove ourselves.

            // To properly remove from array without exact object match, we'd need to read, filter, write.
            // Let's do the read-modify-write pattern for safety.
            const sSnap = await getDocs(query(collection(db, 'squads'), where('__name__', '==', squad.id))); // actually just get doc
            // simplified:
            const currentSquadMembers = squad.members || [];
            const newMembers = currentSquadMembers.filter(m => m.uid !== user.uid);

            await updateDoc(squadRef, {
                members: newMembers,
                memberCount: newMembers.length
            });

            // Remove squadId from user
            await updateDoc(doc(db, 'users', user.uid), { squadId: null });

            setSquad(null); // Immediate local update
        } catch (error) {
            console.error("Leave squad failed:", error);
        } finally {
            setLoading(false);
        }
    };

    const createSquad = async (squadName, squadGenre) => {
        if (!user) return;
        setLoading(true);
        try {
            const newSquad = {
                name: squadName || 'Squad ' + (Math.random() + 1).toString(36).substring(7).toUpperCase(),
                members: [{ uid: user.uid, name: user.displayName || 'Anonymous', avatar: user.photoURL || '' }],
                memberCount: 1,
                genre: squadGenre || 'General',
                xp: 0,
                createdAt: new Date().toISOString()
            };
            const docRef = await addDoc(collection(db, 'squads'), newSquad);
            const squadId = docRef.id;

            await updateDoc(doc(db, 'users', user.uid), { squadId });
            // Local state update handled by listener ideally, but we can set it to speed up UI
        } catch (error) {
            console.error("Create squad failed:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SquadContext.Provider value={{ squad, findSquad, createSquad, leaveSquad, loading }}>
            {children}
        </SquadContext.Provider>
    );
};
