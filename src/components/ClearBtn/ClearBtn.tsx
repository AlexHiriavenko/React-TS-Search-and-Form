interface ClearBtnProps {
  clearInput: () => void;
}

function ClearBtn({ clearInput }: ClearBtnProps) {
  function clearSearhField() {
    localStorage.setItem('lastSearch', '');
    clearInput();
  }

  return (
    <div className="clear-btn" onClick={clearSearhField}>
      X
    </div>
  );
}

export default ClearBtn;
