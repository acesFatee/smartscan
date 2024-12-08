import { db } from "@/config/firebase";

export const createUser = async (user) => {
    try {
        const { email, first_name, last_name, id } = user;
        const userDoc = {
            kindeId: id,
            email,
            firstName: first_name,
            lastName: last_name
        };

        const docRef = await db.collection("users").add(userDoc);

        const savedDoc = await docRef.get();

        if (savedDoc.exists) {
            return { id: savedDoc.id, ...savedDoc.data() };
        } else {
            throw new Error("Document not found after creation");
        }

    } catch (error) {
        console.error("Error adding user: ", error);
        throw error;
    }
};
