## R.E.P.O Save to JSON

## Instructions

1. [Install Deno](https://docs.deno.com/runtime/getting_started/installation/)
3. Copy desired save from `%appdata%\..\LocalLow\semiwork\Repo\saves\` to this folder
4. Run in a terminal from the repo root

    ```sh
    # If you don't want to clone the repo
    deno run https://raw.githubusercontent.com/Meshiest/repo-editor/refs/heads/main/main.ts mySaveFile.es3

    # If you cloned the repo
    deno run start mySaveFile.es3
    ```

5. Edit `mySaveFile.es3.json`
6. Convert the edited JSON back into a save

    ```sh
    # If you still didn't clone the repo
    deno run https://raw.githubusercontent.com/Meshiest/repo-editor/refs/heads/main/main.ts mySaveFile.es3.json

    # If you cloned the repo
    deno run start mySaveFile.es3.json
    ````
8. Copy save back to save folders