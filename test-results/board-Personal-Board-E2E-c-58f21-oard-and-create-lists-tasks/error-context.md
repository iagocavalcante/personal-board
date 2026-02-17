# Page snapshot

```yaml
- generic [ref=e1]:
  - generic [ref=e3]:
    - generic [ref=e4]:
      - img [ref=e5] [cursor=pointer]
      - heading "Task Board" [level=2] [ref=e6]
      - button "← Go back to dashboard" [ref=e7] [cursor=pointer]:
        - generic [ref=e8]: ← Go back to dashboard
      - separator [ref=e9]:
        - generic [ref=e11]: My Tasks
      - button "Create list" [ref=e13] [cursor=pointer]:
        - generic [ref=e14]: Create list
    - contentinfo:
      - paragraph [ref=e15]: Personal Board, Version 1.0.0 - Developed by Iago Cavalcante
  - dialog [ref=e17]:
    - button "close" [ref=e18] [cursor=pointer]:
      - img [ref=e20]
    - generic [ref=e24]:
      - img [ref=e26]
      - text: New list
    - textbox "Enter with list name" [active] [ref=e34]: To Do
    - generic [ref=e35]:
      - button "Cancel" [ref=e36] [cursor=pointer]:
        - generic [ref=e37]: Cancel
      - button "Create" [ref=e38] [cursor=pointer]:
        - generic [ref=e39]: Create
```