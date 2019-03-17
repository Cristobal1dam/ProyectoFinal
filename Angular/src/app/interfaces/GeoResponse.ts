export interface GeoResponse {
    Response:{
        View:[
            {Result:[
                {Location:{
                    DisplayPosition:{
                        Latitude: string,
                        Longitude: string
                    }
                }}
            ]}
        ]
    }
    
}
