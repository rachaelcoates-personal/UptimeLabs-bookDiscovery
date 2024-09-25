'use client';
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function BookWorksPage() {
    const searchParams = useSearchParams();
    const [item, setItem] = useState<any>(null);

    useEffect(() => {
        const itemParam = searchParams.get('item');
        if (itemParam) {
            setItem(JSON.parse(itemParam));
        }
    }, [searchParams]);
    
	return  <div>
    <h1>Book Works</h1>
    {item ? (
        <div>
            <h2>Item Details</h2>
            <p>Author: {item.author_name}</p>
            <p>Title: {item.title}</p>
            <p>Cover: {item.cover_edition_key}</p>
            {/* Render other item details as needed */}
        </div>
    ) : (
        <p>No item data</p>
    )}
</div>;
}