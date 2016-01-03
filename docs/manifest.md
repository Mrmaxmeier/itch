
#### basic structure:
```json
{
  "<platform filter>": {
    "install_profiles [optional]": {
      "<profile-name>": [
        {"type": "<action-type>", "platform [optional]": "<only run this action on platform>", "...": "kwargs"}
      ]
    },
    "launch_profiles [optional]": {
      "<profile-name>": [
        {"type": "<action-type>", "platform [optional]": "<only run this action on platform>", "...": "kwargs"}
      ]
    },
    "requirements [optional]": [
      {"name": "<name>", "version": "<version>"}
    ]
  },
  "manifest_version": 1
}
```

#### install action types:
```json
[
  {"type": "download", "file": "<file name>", "for_platform [optional]": "<file platform>"},
  {"type": "extract", "file [optional]": "<file name>"},
  {"type": "bash", "command": "<bash command>"}
]
```

#### launch action types:
```json
[
  {"type": "execute", "file": "<file name>"},
  {"type": "bash", "command": "<bash command>"}
]
```

#### platform filter:
- `linux+osx` will run on osx and linux
- `windows` will run on windows
- `osx+windows+linux` will run on osx, windows and linux

## TODO
- restrict launch_profiles to install_profiles
- meta meta meta
