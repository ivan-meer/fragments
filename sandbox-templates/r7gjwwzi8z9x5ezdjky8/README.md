# Sandbox Template: r7gjwwzi8z9x5ezdjky8

This template provides a basic structure for creating custom sandboxes using the E2B platform.

## Usage

### Python SDK

```python
from e2b import Sandbox, AsyncSandbox

# Create sync sandbox
sandbox = Sandbox("r7gjwwzi8z9x5ezdjky8")

# Create async sandbox
sandbox = await AsyncSandbox.create("r7gjwwzi8z9x5ezdjky8")
```

### JS SDK

```javascript
import { Sandbox } from 'e2b';

// Create sandbox
const sandbox = await Sandbox.create('r7gjwwzi8z9x5ezdjky8');
```

## Customization

You can customize the sandbox by modifying the Dockerfile and other configuration files as needed.

## Learn More

For more information, visit the [E2B documentation](https://e2b.dev/docs).
