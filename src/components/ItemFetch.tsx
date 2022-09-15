import request from "./../assets/request.json"

export async function ItemFetch(currentInput: any, isHQ: boolean, setLoading: Function, setFetchBuffer: Function, setEntries: Function) {
    
    console.log(`Called with ${currentInput()}`)

    if (currentInput() === "") {
        console.log(`Skipped.`)
        setLoading(false)
        setFetchBuffer(false)
        return(-1)
    }

    let newRequest = request
    newRequest.body.query.bool.filter[1].term.CanBeHq = isHQ ? "1" : "0"
    newRequest.body.query.bool.must[0].wildcard.NameCombined_en = `*${currentInput()}*`
    setFetchBuffer(false)

    let final: Item[] = [];

    await fetch("https://xivapi.com/search", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newRequest)
    })
    .then(result => result.json())
    .then(result => {console.log(result);return(result)})
    .then(result => result.Results)
    .then(result => {
        for (let entry of result) {
            let temp: Item = {
                ID: entry.ID,
                Name: entry.Name_en,
                Icon: entry.Icon, 
                CanBeHQ: entry.CanBeHq
            }
            final = final.concat([temp])
    }})
    .then(() => setEntries(final))
    .then(() => setLoading(false))
    .then(() => console.log(final))
} 

export interface Item {
    ID: number
    Name: string
    Icon: string
    CanBeHQ: number
}
