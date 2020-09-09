import React,{createContext,useState,useContext} from 'react'


const TestProvider = createContext();


export default ({children}) => 
{
    let[version,setVersion] = useState("1.0.0")

    return(
       <TestProvider.Provider value={{  version , setVersion  }}>
           {children}
       </TestProvider.Provider> 
    )
}

export function useMetadata(){

        const context = useContext(TestProvider)

        if( context == null )
            throw new Error("Metadata must be provided by context ")

        const  { version , setVersion } = context 
        return [  version , setVersion ]

}