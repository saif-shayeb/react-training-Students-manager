import styled from "styled-components";

const StyledBtn = styled.button`
  background: var(${(props) => (props.danger ? "--danger" : "--primary")});
  color: white;
  padding: 0.875rem 2rem;
  border: none;
  border-radius: var(--radius-md);
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  ${(props) => (props.width ? `width: ${props.width};` : "")}
  transition: var(--transition);
  box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.2);

  &:hover {
    background: ${(props) =>
    props.danger ? "#b91c1c" : "var(--primary-hover)"};
    transform: translateY(-2px);
    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.3);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background-color: var(--text-muted);
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

function CustomBtn(props) {
  return <StyledBtn {...props}>{props.children}</StyledBtn>;
}

export default CustomBtn;
