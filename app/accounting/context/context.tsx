"use client"

import { auth } from "../../firebase/initialize"
import { createContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { get_cat } from "@/app/firebase/firebase";

type CategoryContextType = {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
};

export const CategoryContext = createContext<CategoryContextType | null>(null);

export default function CategoryProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            router.replace("/");
            return;
        }
        let isMounted = true;

        get_cat(user.uid)
            .then((data) => {
                if (isMounted) setCategories(data);
            })
            .catch(() => {
                if (isMounted) router.replace("/");
            });
        return () => {
            isMounted = false;
        };
    }, [router]);

    return (
        <CategoryContext.Provider value={{ categories, setCategories }}>
            {children}
        </CategoryContext.Provider>
    );
}