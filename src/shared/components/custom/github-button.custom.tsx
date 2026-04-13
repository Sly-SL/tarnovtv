'use client';

import Swal from 'sweetalert2';
import Link from "next/link";
import type {MouseEvent} from "react";
import GithubIcon from "@/shared/consts/icons/github.icon";

interface Props {
    url: string;
    isPrivate: boolean;
}

export default function GithubButton({ url, isPrivate }: Props) {
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (!isPrivate) return;

        e.preventDefault();

        Swal.fire({
            icon: 'info',
            title: 'Source Code Private',
            text: 'Unfortunately, source code is not available, cause repository is private.',
            confirmButtonText: 'Ok',
            confirmButtonColor: '#3085d6',
            background: '#030014',
            color: '#ffffff',
        });
    };

    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="group relative inline-flex items-center space-x-2 px-4 md:px-8 py-2.5 md:py-4 bg-gradient-to-r from-purple-600/10 to-pink-600/10 hover:from-purple-600/20 hover:to-pink-600/20 text-purple-300 rounded-xl transition-all duration-300 border border-purple-500/20 hover:border-purple-500/40 backdrop-blur-xl overflow-hidden text-sm md:text-base"
        >
            <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-purple-600/10 to-pink-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
            <GithubIcon className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
            <span className="relative font-medium">Github</span>
        </Link>
    );
}