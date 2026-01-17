import { useEffect } from 'react';

const useSEO = (title, description) => {
    useEffect(() => {
        // Update Title
        document.title = title ? `${title} | CoLearn Arina` : "CoLearn Arina - Gamified Learning & Squads";

        // Update Meta Description
        const metaDesc = document.querySelector("meta[name='description']");
        if (metaDesc) {
            metaDesc.setAttribute("content", description || "Join the elite coding squad. Complete quests, earn XP, and level up your developer skills in a gamified world.");
        } else {
            const newMeta = document.createElement("meta");
            newMeta.name = "description";
            newMeta.content = description || "Join the elite coding squad. Complete quests, earn XP, and level up your developer skills in a gamified world.";
            document.head.appendChild(newMeta);
        }

        // Open Graph - Title
        let ogTitle = document.querySelector("meta[property='og:title']");
        if (!ogTitle) {
            ogTitle = document.createElement("meta");
            ogTitle.setAttribute("property", "og:title");
            document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute("content", title || "CoLearn Arina");

        // Open Graph - Description
        let ogDesc = document.querySelector("meta[property='og:description']");
        if (!ogDesc) {
            ogDesc = document.createElement("meta");
            ogDesc.setAttribute("property", "og:description");
            document.head.appendChild(ogDesc);
        }
        ogDesc.setAttribute("content", description || "Gamify your learning journey.");

    }, [title, description]);
};

export default useSEO;
