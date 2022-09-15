import { Checkbox, Input, InputGroup, Select, SelectContent, SelectListbox, SelectOption, SelectOptionIndicator, SelectOptionText, SelectTrigger, HStack, Center, Spinner, Box } from '@hope-ui/solid'
import { createSignal, For, Switch, Match, Show} from 'solid-js'
import { ItemFetch, Item } from './ItemFetch'

export default function ItemSelect(props: any) {
    let a: Item[] = []
    const [currentItemLabel, setCurrentItemLabel] = createSignal("")
    const [currentInput, setCurrentInput] = createSignal("")
    const [entries, setEntries] = createSignal(a)
    const [isLoading, setLoading] = createSignal(false)
    const [fetchBuffer, setFetchBuffer] = createSignal(false)
    const [isHQ, setHQ] = createSignal(true)

    const handleInput = (ev: any) => setCurrentInput(ev.target.value)

    return (
        <HStack>
        <Select variant="unstyled" onChange={(val) => {
            setCurrentItemLabel(val); 
            props.ItemIDSetter(entries().filter(o => o.Name===currentItemLabel())[0].ID)
            props.SetSelected(true)
            }}>
            <SelectTrigger maxW="300px" paddingBottom="0px">
                <InputGroup variant="unstyled">
                    <Input 
                        maxW="300px"
                        placeholder="Select an item..." 
                        value={currentItemLabel()} 
                        onInput={
                            (val) => {
                                setLoading(true) 
                                handleInput(val)                            
                                if (fetchBuffer() !== true) {
                                    setFetchBuffer(true)
                                    setTimeout(() => {ItemFetch(currentInput, isHQ(), setLoading, setFetchBuffer, setEntries)}, 350)
                                }
                            }
                        }
                    />
                </InputGroup>
            </SelectTrigger>
            <SelectContent>
                <Switch fallback={
                    <SelectListbox>
                        <For each={entries()}>{
                            entry => (
                                <SelectOption value={entry.Name} padding="5px">
                                    <img src={"https://xivapi.com/" + entry.Icon} height="40px"/>
                                    <SelectOptionText fontSize="medium">{entry.Name}</SelectOptionText>
                                    <SelectOptionIndicator />
                                </SelectOption>
                            )
                        }
                        </For>
                    </SelectListbox>
                }>
                    <Match when={isLoading()}>
                        <Box minH="60px">
                            <Center h="60px" w="254px">
                                <Spinner />
                            </Center>
                        </Box>
                    </Match>
                    <Match when={currentInput() === ""}>
                        <Box color="$neutral9" padding="5px" minH="50px">
                            <Center h="50px" w="140px">
                            Start searching...
                            </Center>
                        </Box>
                    </Match>
                    <Match when={entries().length === 0}>
                        <Box color="$neutral9" padding="5px" minH="50px">
                            <Center h="50px" w="140px">
                                No items found.
                            </Center>
                        </Box>
                    </Match>
                </Switch>
            </SelectContent>
        </Select>
        <Checkbox 
            defaultChecked
            variant="outline" 
            display="flex" 
            size="lg"
            colorScheme="neutral"
            checked={isHQ()} 
            iconChecked={() => {
                return (
                    <img src="src/assets/hq.png" />
                )
            }}
            onChange={() => {isHQ() ? setHQ(false) : setHQ(true);console.log(`Set isHQ to ${isHQ()}`)}}
        />     
        </HStack>
    )
}