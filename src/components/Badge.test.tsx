import {render, screen} from '@testing-library/react';
import MissingFieldBadge from './Badge';

describe('MissingFieldBadge', () => {
    it('renders without crashing', () => {
        render(<MissingFieldBadge />);
        expect(screen.getByText('Missing')).toBeInTheDocument();
    });

    it('has the correct color and size', () => {
        render(<MissingFieldBadge />);
        const chip = screen.getByText('Missing').closest('div');
        expect(chip).toHaveClass('MuiChip-root');
        expect(chip).toHaveClass('MuiChip-sizeSmall');
        expect(chip).toHaveClass('MuiChip-colorError');
    });
});
