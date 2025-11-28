import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRef } from 'react';
import { UseModalAccessibility } from './use-modal-accessibility';


function TestComponent({ isOpen, onModalClose }: { isOpen: boolean; onModalClose: () => void }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const initialFocusRef = useRef<HTMLButtonElement>(null);

  UseModalAccessibility({
    isOpen,
    onModalClose,
    modalRef,
    initialFocusRef,
  });

  return (
    <div>
      <button data-testid="outside">Outside</button>

      <div ref={modalRef}>
        <button data-testid="first" ref={initialFocusRef}>First</button>
        <button data-testid="second">Second</button>
      </div>
    </div>
  );
}

describe('useModalAccessibility', () => {
  let onModalClose: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    onModalClose = vi.fn();
  });

  afterEach(() => {
    document.body.style.overflow = '';
  });

  it('sets focus on initialFocusRef when opened', () => {
    const { getByTestId } = render(<TestComponent isOpen onModalClose={onModalClose} />);

    const firstButton = getByTestId('first');

    expect(document.activeElement).toBe(firstButton);
  });

  it('calls onClose when Escape is pressed', () => {
    render(<TestComponent isOpen onModalClose={onModalClose} />);

    fireEvent.keyDown(document, { key: 'Escape' });

    expect(onModalClose).toHaveBeenCalledTimes(1);
  });

  it('disables scroll on body when open', () => {
    render(<TestComponent isOpen onModalClose={onModalClose} />);

    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores scroll when closed', () => {
    const { rerender } = render(<TestComponent isOpen onModalClose={onModalClose} />);

    expect(document.body.style.overflow).toBe('hidden');

    rerender(<TestComponent isOpen={false} onModalClose={onModalClose} />);

    expect(document.body.style.overflow).toBe('');
  });

  it('traps focus inside the modal with Tab', () => {
    const { getByTestId } = render(<TestComponent isOpen onModalClose={onModalClose} />);

    const first = getByTestId('first');
    const second = getByTestId('second');

    expect(document.activeElement).toBe(first);

    second.focus();
    expect(document.activeElement).toBe(second);

    fireEvent.keyDown(document, { key: 'Tab' });

    expect(document.activeElement).toBe(first);
  });

  it('cycles focus backwards with Shift+Tab', () => {
    const { getByTestId } = render(<TestComponent isOpen onModalClose={onModalClose} />);

    const first = getByTestId('first');
    const second = getByTestId('second');

    expect(document.activeElement).toBe(first);

    fireEvent.keyDown(document, { key: 'Tab', shiftKey: true });
    expect(document.activeElement).toBe(second);
  });

  it('prevents focus from leaving modal when tabbing from outside', () => {
    const { getByTestId } = render(<TestComponent isOpen onModalClose={onModalClose} />);

    const first = getByTestId('first');
    const outside = getByTestId('outside');

    outside.focus();
    expect(document.activeElement).toBe(outside);

    fireEvent.keyDown(document, { key: 'Tab' });

    expect(document.activeElement).toBe(first);
  });
});
