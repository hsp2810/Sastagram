import TabsContainer from "./tabs/tabs-container";

interface PageProps {
  setCreateDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function CreateModalTabsMain({ setCreateDialogOpen }: PageProps) {
  return <TabsContainer setCreateDialogOpen={setCreateDialogOpen} />;
}
