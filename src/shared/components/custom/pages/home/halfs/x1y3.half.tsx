import {StatCard} from "@/shared/components/custom/stats-card.custom";
import {projectsGet} from "@/lib/firebase/get/projects.get";
import {getDocumentsQuery} from "@/lib/firebase/get/document.get";
import {CertificateIcon, CodeIcon, GlobeIcon} from "@phosphor-icons/react";
import Animate from "@/shared/components/libs/animate/animate.ssr";

export const revalidate = 3600 * 24

const X1Y3Half = async () => {
    const storedProjects = await projectsGet()
    const storedDocuments = await getDocumentsQuery()
    const startDate = new Date("2021-11-01");
    const today = new Date();
    const YearExperience =
        today.getFullYear() - startDate.getFullYear() -
        (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    const totalProjects = storedProjects.length;
    const totalDocuments = storedDocuments.length;


    function getYearWord(n:number) {
        if (n === 1) return "rok";

        const lastDigit = n % 10;
        const lastTwoDigits = n % 100;

        if (
            lastDigit >= 2 &&
            lastDigit <= 4 &&
            !(lastTwoDigits >= 12 && lastTwoDigits <= 14)
        ) {
            return "lata";
        }

        return "lat";
    }

    const years = `${YearExperience} ${getYearWord(YearExperience)}`;

    const statsData = [
        {
            icon: CodeIcon,
            color: "from-white/20 to-gray-200/20",
            value: totalProjects,
            label: "Wysokopoziomowe projekty",
            description: "Ilość stworzonych innowacyjnych rozwiązań",
        },
        {
            icon: CertificateIcon,
            color: "from-white/20 to-gray-200/20",
            value: totalDocuments,
            label: "Dokumenty",
            description: "Umiejętności potwierdzone dokumentami",
        },
        {
            icon: GlobeIcon,
            color: "from-white/20 to-gray-200/20",
            value: years,
            label: "Lata doświadczenia komercyjnego",
            description: "Profesjonalizm polega na ciągłym rozwoju",
        },
    ];


    return (
        <div className={"py-4 px-4 sm:px-8 md:px-12 lg:px-20 grid md:grid-cols-3 gap-4 md:grid-rows-1 grid-rows-3 grid-cols-1"}>
            {statsData.map((item, i) => (
                <Animate
                    key={i}
                    preset={3 % i === 1 ? "fadeRight" : 3 % i  === 2 ? "fadeDown" : "fadeLeft"} duration={1200}>
                    <StatCard {...item} />
                </Animate>
            ))}
        </div>
    );
};

export default X1Y3Half;