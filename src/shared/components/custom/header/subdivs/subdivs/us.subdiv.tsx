import SubdivConstructor from "@/shared/components/custom/header/subdivs/subdiv-constructor.subdiv";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const UsSubdiv = () => {
    return (
        <SubdivConstructor id={"us"}>
            <Animate preset={"fadeRight"}>
                <div/>
            </Animate>
        </SubdivConstructor>
    );
};

export default UsSubdiv;