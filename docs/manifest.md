
#### basic structure:
```json
{
  "<platform filter>": {
    "install_profiles [optional]": {
      "<profile-name>": [
        {"type": "<action-type>", "platform [optional]": "<only run this action on platform>", "...": "..."}
      ]
    },
    "launch_profiles [optional]": {
      "<profile-name>": [
        {"type": "<action-type>", "platform [optional]": "<only run this action on platform>", "...": "..."}
      ]
    },
    "requirements [optional]": [
      {"name": "<name>", "version": "<version>"}
    ]
  },
  "manifest_version": 1
}
```

```json
{
    "launch_profiles [optional]": {
      "<profile-name>": {
        "actions": [
          {"type": "<action-type>", "platform [optional]": "<only run this action on platform>", "...": "..."}
        ],
        "comment [optional]": "this is the default profile"
      }
    }
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

### folder structure
```
manifests/
  ID_custom_text.json
  3_X-Moon.json
or
manifests/
  leafo/
    3_X-Moon
or
manifests/
  leafo.x-moon.json


modules/
  love-0.9.3.json
  love-0.10.0.json
```

## TODO
- restrict launch_profiles to install_profiles
- meta meta meta
