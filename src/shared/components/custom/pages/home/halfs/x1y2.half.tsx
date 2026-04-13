import SiteRender from "@/public/assets/render-full.webp"
import RoundPhotoCustom from "@/shared/components/custom/round-photo.custom";

const X1Y2Half = () => {
    return (
        <div className={"pt-5 grid justify-center"}>
            <RoundPhotoCustom
                photo={SiteRender}
                alt={"Site render"}/>
        </div>
    );
};

export default X1Y2Half;