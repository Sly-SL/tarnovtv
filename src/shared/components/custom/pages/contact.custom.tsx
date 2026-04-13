import {ButtonsContactEnum} from "@/shared/consts/enums/buttons-contact.enum";
import Animate from "@/shared/components/libs/animate/animate.ssr";

const ContactCustom = () => {
    return (
        <div className={"grid grid-cols-1 items-start justify-center"}>
            {ButtonsContactEnum.map((item, i) => (
                <div className={"grid grid-cols-1 pt-2"} key={i}>
                    <label className={"font-bold dark:text-white/80 text-black/80 pb-1 px-1 text-3xl "}>
                        {item.label}
                    </label>

                    {item.buttons.map((button, i) => ((
                        <Animate preset={i % 4 == 1 ? "fadeRight" : i % 4 == 2 ?  "fadeDown": i % 4 == 3 ? "fadeUp" : "fadeRight"}
                                 className={item.linkClassName}
                                 key={i}>
                            {button.element}
                        </Animate>
                    )))}
                </div>
            ))}
        </div>
    );
};

export default ContactCustom;