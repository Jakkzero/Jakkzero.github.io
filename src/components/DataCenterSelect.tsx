import { Checkbox, Select, SelectContent, SelectLabel, SelectListbox, SelectOption, SelectOptionIndicator, SelectOptionText, SelectPlaceholder, SelectTrigger, SelectValue, VStack } from '@hope-ui/solid'
import { createSignal, For, Setter } from 'solid-js'
import dataCenters from "./../assets/data-centers.json"


export default function DataCenterSelect(props: any) {
    const [includeFullRegion, setIncludeFullRegion] = createSignal(false)
    const [selectedDataCenter, selectDataCenter] = createSignal("")

    return (
        <VStack>
        <Select variant="unstyled" onChange={val => {
            selectDataCenter(val); 
            handleChange(val, includeFullRegion(), props.WorldsSetter)
            props.SetSelected(true)
            }}>
            <SelectTrigger maxW="300px" paddingBottom="0px">
                <SelectPlaceholder>Select a Data Center...</SelectPlaceholder>
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectListbox>
                    <For each={["Europe", "North-America", "Japan", "中国"]} >
                    {region => (
                        <>
                        <SelectLabel>{region}</SelectLabel>
                        {/*@ts-ignore*/}
                        <For each={dataCenters.filter((o) => o.region === region)}>{
                            center => (
                                <SelectOption value={center.name}>
                                    <SelectOptionText>{center.name}</SelectOptionText>
                                    <SelectOptionIndicator />
                                </SelectOption>
                            )
                        }
                        </For>
                        </>
                    )}
                    </For>
                </SelectListbox>
            </SelectContent>
        </Select>

        <Checkbox 
            variant="outline" 
            display="flex" 
            size="sm" 
            paddingTop="0px" 
            colorScheme="neutral"
            checked = {includeFullRegion()}
            onChange = {() => {
                includeFullRegion() ? setIncludeFullRegion(false) : setIncludeFullRegion(true)
                handleChange(selectedDataCenter(), includeFullRegion(), props.WorldsSetter) 
            }}
        >
            Include Data Centers from same region
        </Checkbox>

        </VStack>
    )
}

const handleChange = (selection: string, includeFullRegion: boolean, WorldsSetter: Setter<number[]>) => {

    let centerDetails = dataCenters.filter(o => o.name === selection)
    console.log(centerDetails[0])

    if (!includeFullRegion) {
        WorldsSetter(centerDetails[0].worlds)
        console.log(centerDetails[0].worlds)
    }
    else {
        let regionDetails = dataCenters.filter(o => o.region === centerDetails[0].region)
        let allWorlds: number[] = []
        for (let i of regionDetails) {
            allWorlds = allWorlds.concat(i.worlds)
        }
        WorldsSetter(allWorlds)
        console.log(allWorlds)
    }
}

