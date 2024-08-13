import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Cursor from "../../components/Cursor";
import Header from "../../components/Header";
import data from "../../data/work.json"; // Import data from your JSON file
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";

const Blog = () => {
    const showBlog = useRef(data.showBlog);
    const text = useRef();
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useIsomorphicLayoutEffect(() => {
        stagger(
            [text.current],
            { y: 40, x: -10, transform: "scale(0.95) skew(10deg)" },
            { y: 0, x: 0, transform: "scale(1)" }
        );
        if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
        else router.push("/");
    }, []);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        showBlog.current && (
            <>
                {data.showCursor && <Cursor />}
                <Head>
                    <title>Work</title>
                </Head>
                <div
                    className={`container mx-auto mb-10 ${data.showCursor && "cursor-none"
                        }`}
                >
                    <Header isBlog={true}></Header>
                    <div className="mt-10">
                        <h1
                            ref={text}
                            className="mx-auto mob:p-2 text-bold text-6xl laptop:text-8xl w-full"
                        >
                            Work.
                        </h1>
                        <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
                            {data.posts && // Access posts from the JSON data
                                data.posts.map((post) => (
                                    <a
                                        href={post.url} // Use the URL from the JSON data
                                        className="cursor-pointer relative block" // Ensure it's block to fill the container
                                        key={post.slug}
                                        target="_blank" // Open link in new tab
                                        rel="noopener noreferrer" // For security
                                    >
                                        <img
                                            className="w-full h-60 rounded-lg shadow-lg object-cover"
                                            src={post.image}
                                            alt={post.title}
                                        />
                                        <h2 className="mt-5 text-4xl">{post.title}</h2>
                                        <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                                        <span className="text-sm mt-5 opacity-25">
                                            {ISOToDate(post.date)}
                                        </span>
                                        {process.env.NODE_ENV === "development" && mounted && (
                                            <div className="absolute top-0 right-0">
                                                {/* Development-only content */}
                                            </div>
                                        )}
                                    </a>
                                ))}
                        </div>
                    </div>
                </div>
            </>
        )
    );
};

export default Blog;

