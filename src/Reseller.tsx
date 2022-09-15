import { Component, createSignal } from 'solid-js';
import DataCenterSelect from './components/DataCenterSelect';
import ItemSelect from './components/ItemSelect'
import { Box, HStack } from '@hope-ui/solid';
import { ItemCostChart } from './components/ItemCostChart';

const Reseller: Component = () => {
  const [currentWorlds, setCurrentWorlds] = createSignal([0])
  const [currentItemID, setCurrentItemID] = createSignal(0)
  const [centerSelected, selectCenter] = createSignal(false)
  const [itemSelected, selectItem] = createSignal(false)

  return (<>
    <Box bgColor="$neutral3" w="100%" h="flex" p="15px">
      <HStack spacing="40px">
        <DataCenterSelect WorldsSetter={setCurrentWorlds} SetSelected={selectCenter}/>
        <ItemSelect ItemIDSetter={setCurrentItemID} SetSelected={selectItem}/>
      </HStack>
    </Box>
    <ItemCostChart worlds={currentWorlds()} enabled={centerSelected() && itemSelected()}/>
  </>);
};

export default Reseller;
