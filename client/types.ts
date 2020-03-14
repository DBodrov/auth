export type TComponentItem = {name: string; link: string};

export type DataProviderProps = {
    children: React.ReactNode;
    context: TComponentItem[];
}
