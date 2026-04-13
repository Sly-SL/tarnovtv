import ContactForm from "@/shared/components/forms/contact.form";
import SubdivConstructor from "@/shared/components/custom/header/subdivs/subdiv-constructor.subdiv";
import SocialLinksCustom from "@/shared/components/custom/social-links.custom";

const ContactSubdiv = () => {


    return (
        <SubdivConstructor id="contact">
            <div className="w-full h-full grid grid-cols-2 gap-30">
                <ContactForm/>
                <div className={"text-2xl text-center"}>
                    <SocialLinksCustom/>
                </div>
            </div>
        </SubdivConstructor>
    );
};

export default ContactSubdiv;