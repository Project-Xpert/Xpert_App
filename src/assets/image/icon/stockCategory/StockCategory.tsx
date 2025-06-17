import Oil from './Oil.svg';
import Arms from './Arms.svg';
import IT from './IT.svg';
import Distribution from './Distribution.svg';
import Bio from './Bio.svg';
import {StyleSheet, View} from 'react-native';
import {screenSize} from '../../../styles/screenSize';

const StockCategoryMapTable: Record<string, React.FC<any>> = {
  Oil: Oil,
  Arms: Arms,
  IT: IT,
  Distribution: Distribution,
  Bio: Bio,
};

interface iconProps {
  categoryName: string;
  width?: number;
  height?: number;
}

const StockCategory = ({categoryName, width, height}: iconProps) => {
  const StockCategory = StockCategoryMapTable[categoryName];
  if (!StockCategory) return;

  return (
    <View style={{width, height, ...iconStyles.container}}>
      <StockCategory width={width} height={height} />
    </View>
  );
};

const iconStyles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: screenSize.getVH(2.2),
  },
});

export default StockCategory;
