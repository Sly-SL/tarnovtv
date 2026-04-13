import htmlIcon from "@/public/assets/tech/html.svg";
import cssIcon from "@/public/assets/tech/css.svg";
import jsIcon from "@/public/assets/tech/javascript.svg";
import tsIcon from "@/public/assets/tech/typescript.svg";
import tailwindIcon from "@/public/assets/tech/tailwind.svg";
import reactIcon from "@/public/assets/tech/react.svg";
import nextjsIcon from "@/public/assets/tech/nextjs.svg";
import nodejsIcon from "@/public/assets/tech/nodejs.svg";
import bunIcon from "@/public/assets/tech/bun.ico";
import firebaseIcon from "@/public/assets/tech/firebase.svg";
import nestIcon from "@/public/assets/tech/nest.svg";
import mysqlIcon from "@/public/assets/tech/mysql.svg";
import sweetAlertIcon from "@/public/assets/tech/sweet-alert.svg";
import actixIcon from "@/public/assets/tech/actix.svg";
import dieselIcon from "@/public/assets/tech/diesel.png";
import prismaIcon from "@/public/assets/tech/prisma.svg";
import dockerIcon from "@/public/assets/tech/docker.svg";
import graphqlIcon from "@/public/assets/tech/graphql.svg";
import postgresqlIcon from "@/public/assets/tech/postgresql.svg";

export const TechStacksEnum = [
    { icon: htmlIcon, language: "HTML" },
    { icon: cssIcon, language: "CSS" },
    { icon: jsIcon, language: "JavaScript" },
    { icon: tsIcon, language: "TypeScript" },
    { icon: tailwindIcon, language: "Tailwind CSS" },
    { icon: reactIcon, language: "React" },
    { icon: nextjsIcon, language: "Next" },
    { icon: nodejsIcon, language: "Node JS" },
    { icon: bunIcon, language: "Bun.sh" },
    { icon: firebaseIcon, language: "Firebase" },
    { icon: postgresqlIcon, language: "PostgreSQL" },
    { icon: nestIcon, language: "NestJs" },
    { icon: mysqlIcon, language: "MySql" },
    { icon: sweetAlertIcon, language: "SweetAlert2" },
    { icon: actixIcon, language: "Actix Web" },
    { icon: dieselIcon, language: "DieselOrm" },
    { icon: prismaIcon, language: "Prisma" },
    { icon: dockerIcon, language: "Docker" },
    { icon: graphqlIcon, language: "Graphql" },
] as const;