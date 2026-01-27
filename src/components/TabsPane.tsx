import { useEffect, useState } from "react";
import { Tabs } from "@base-ui/react/tabs";
import Section from "./Section";

type SectionType = "boons" | "encounters" | "adventures";

interface TabConfig {
  id: SectionType;
  label: string;
  title: string;
  description: string;
}

const tabs: TabConfig[] = [
  {
    id: "boons",
    label: "Boons",
    title: "Daniel Boon's Shop",
    description: "Spend coins on fun or relaxing boons.",
  },
  {
    id: "encounters",
    label: "Encounters",
    title: "Encounters",
    description: "Earn coins by completing tasks.",
  },
  {
    id: "adventures",
    label: "Adventures",
    title: "Adventures",
    description: "Earn coins by working towards bigger goals. Each 45 minute span spent on an adventure counts as one completion.",
  },
];

type Props = {
  isEditable: boolean;
};

export default function TabsPane({ isEditable }: Props) {
  const [showTabs, setShowTabs] = useState(false);

  useEffect(() => {
    const checkWidth = () => {
      setShowTabs(window.innerWidth < 900);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (showTabs) {
    return (
      <Tabs.Root defaultValue={tabs[0].id} className="tabs-pane">
        <Tabs.List className="tabs-list">
          {tabs.map((tab) => (
            <Tabs.Tab key={tab.id} value={tab.id} className="tabs-tab">
              <h2>{tab.label}</h2>
            </Tabs.Tab>
          ))}
          <Tabs.Indicator className="tabs-indicator" />
        </Tabs.List>
        {tabs.map((tab) => (
          <Tabs.Panel key={tab.id} value={tab.id} className="tabs-panel">
            <Section
              type={tab.id}
              isEditable={isEditable}
            />
          </Tabs.Panel>
        ))}
      </Tabs.Root>
    );
  }

  return (
    <div className="tabs-pane-columns">
      {tabs.map((tab) => (
        <Section
          key={tab.id}
          title={tab.title}
          type={tab.id}
          description={tab.description}
          isEditable={isEditable}
        />
      ))}
    </div>
  );
}
