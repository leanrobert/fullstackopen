sequenceDiagram
    participant browser
    participant server

    Note right of browser: User writes the content for a new Note, and proceed to click Save
    browser->>server:  POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa Payload: [{content: "New Mark", date: "2023-03-02T18:17:46.551Z"}]
    activate server
    server-->>browser: Status code 201 Response: {"message":"note created"}
    deactivate server