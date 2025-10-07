import Button from "~/src/components/Button/Button";
import "~/src/theme/theme.module.css";
import { createRoot } from "~/src/utilities/shared/shared";

function Examples() {
  return (
    <>
      <div className="test-section">
        <h3>Sizes</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button testId="btn-primary-small" size="small">
            Small Primary
          </Button>
          <Button testId="btn-primary-medium" size="medium">
            Medium Primary
          </Button>
          <Button testId="btn-primary-large" size="large">
            Large Primary
          </Button>
        </div>
      </div>

      <div className="test-section">
        <h3>Variants</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button testId="btn-secondary" variant="secondary">
            Secondary
          </Button>
          <Button testId="btn-accent" variant="accent">
            Accent
          </Button>
          <Button testId="btn-warning" variant="warning">
            Warning
          </Button>
          <Button testId="btn-danger" variant="danger">
            Danger
          </Button>
          <Button testId="btn-info" variant="info">
            Info
          </Button>
        </div>
      </div>

      <div className="test-section">
        <h3>Disabled Buttons</h3>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Button testId="btn-disabled-primary" disabled>
            Disabled Primary
          </Button>
          <Button testId="btn-disabled-secondary" variant="secondary" disabled>
            Disabled Secondary
          </Button>
          <Button testId="btn-disabled-danger" variant="danger" disabled>
            Disabled Danger
          </Button>
        </div>
      </div>
    </>
  );
}

createRoot("example", <Examples />);
