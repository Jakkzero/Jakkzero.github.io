// Implement chart using data from universalis, adding fetch algorithm to ItemFetch.tsx
import worldData from "../assets/worlds.json"
import { Box, Center, Divider, SimpleGrid, Spinner, Text, HStack, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from "@hope-ui/solid"
import { createSignal, For, Show } from "solid-js"

// Create averaging using functions like such:
const average = (val:Array<number>) => val.reduce( (p, c) => p + c, 0) / val.length


export function ItemCostChart(props: any) {
    const [isLoading, setLoading] = createSignal(false)
    
    return (<>
        <Show when={props.enabled === true}>
            <Show when={isLoading() === false} fallback={
                <Center h="100%" w="100%">
                    <Box h="100%" w="100%">
                        <Spinner size="xl" />
                    </Box>
                </Center>
            }>
            {/* {/* <SimpleGrid columns={2} gap="20px" h="fit-content" padding="30px">
                <For each={props.worlds}> 
                {world=>(
                    <Box bgColor={"$neutral3"} height="fit-content" padding="15px">
                        <HStack>
                            <Text size="3xl">{worldData.filter(o => o.id === world)[0].name}</Text>
                            <Divider orientation="vertical" thickness="100px"/>
                        </HStack>
                    </Box>
                )}
                </For> 
            </SimpleGrid> */}
            <Table maxH="100%" maxW="100%">
                <TableCaption>
                    Data fetched from Universalis
                </TableCaption>
                <Thead>
                    <Tr>
                        <Th>Data Center</Th>
                        <Th>Min Price</Th>
                        <Th>Avg. Price</Th>
                        <Th>%diff of Min and Avg</Th>
                        <Th>%diff of Avg and Selection Median</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <For each={props.worlds}>
                    {world => (
                        <Tr>
                            <Td>
                                <Text size="3xl">{worldData.filter(o => o.id === world)[0].name}</Text>
                            </Td>
                            <Td>50</Td>
                            <Td>70</Td>
                            <Td color={Math.sign((50/(70/100)-100)/100) === -1 ? "$success11" : "$danger9"}>
                                {((50/(70/100)-100)/100).toPrecision(3).toString() + "%"}
                            </Td>
                        </Tr>
                    )}

                    </For>
                </Tbody>
            </Table>
            </Show>
        </Show>
    </>)
}
