import { StandarItem } from './standar-item';
import { InputGroup } from '../enums/input-group';

export interface DragItem extends StandarItem {
    projectionId: string;
    type: InputGroup;
    affectiveMonth?: number[];
}