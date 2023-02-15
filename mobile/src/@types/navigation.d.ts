export interface GameParams {
        id: string,
        nome: string;
        bannerUrl: string;
}

export declare global{
    namespace ReactNavigation{
        interface RootParamList{
            home: undefined;
            game: GameParams
        }
    }
}