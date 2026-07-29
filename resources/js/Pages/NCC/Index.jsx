import NCCLayout from "@/Layouts/NCCLayout";
import NCCHeader from "@/Components/NCC/NCCHeader";
import DashboardEntrance from "@/Components/NCC/Dashboard/DashboardEntrance";
import FadeItem from "@/Components/NCC/Dashboard/FadeItem";
import ControlPanel from "@/Components/NCC/ControlPanel";

export default function Index({ data }) {

    return (

        <DashboardEntrance>

            {/* NCC HEADER */}

            <FadeItem delay={0}>

                <NCCHeader />

            </FadeItem>

            {/* CONTROL PANEL */}

            <FadeItem delay={150}>

                <ControlPanel
                    data={data}
                />

            </FadeItem>

        </DashboardEntrance>

    );

}

Index.layout = page => (

    <NCCLayout>

        {page}

    </NCCLayout>

);