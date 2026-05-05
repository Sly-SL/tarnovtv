import type {MetadataRoute} from "next";
import {projectsGet} from "@/lib/firebase/get/projects.get";
import {CONSTANTS} from "@/shared/consts/consts.consts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const projects = await projectsGet();

    return [
        {
            url: CONSTANTS.FRONTEND_URL,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 1,
        },
        {
            url: CONSTANTS.FRONTEND_URL+"/contact",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: CONSTANTS.FRONTEND_URL+"/projects",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: CONSTANTS.FRONTEND_URL+"/media",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
        },
        ...projects.map((project) => ({
            url: `${CONSTANTS.FRONTEND_URL}/projects/${project.id}`,
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        } as {
            url: string;
            lastModified?: string | Date | undefined;
            changeFrequency?: "weekly" | "always" | "hourly" | "daily" | "monthly" | "yearly" | "never" | undefined;
            priority?: number | undefined;
        })),
        {
            url: CONSTANTS.FRONTEND_URL + "/us",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: CONSTANTS.FRONTEND_URL + "/offers",
            lastModified: new Date(),
            changeFrequency: "weekly",
            priority: 0.9,
        },
        {
            url: CONSTANTS.FRONTEND_URL + "/about",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.7,
        },
        {
            url: CONSTANTS.FRONTEND_URL + "/login",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: CONSTANTS.FRONTEND_URL + "/register",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.8,
        },
        {
            url: CONSTANTS.FRONTEND_URL + "/settings",
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.9,
        },
    ];
}