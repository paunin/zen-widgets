# GarminConnect.widget

Garmin Connect widget for Übersicht that displays:

- Heart rate average (30 days)
- Resting heart rate average (30 days)
- Stress average (30 days)
- HRV average (30 days)

It uses a local token file stored in:

- `GarminConnect.widget/.tokens/garmin_tokens.json`

`GarminConnect.widget/.tokens/` is git-ignored.

## Installation

Run everything below from inside the widget directory:

```bash
cd GarminConnect.widget
```

1. Create Python virtual environment and install dependencies:

```bash
python3 -m venv .venv
.venv/bin/python3 -m pip install --upgrade pip
.venv/bin/python3 -m pip install "garminconnect>=0.3"
```

`garminconnect` 0.3+ is required. Older versions stored `oauth1_token.json`/`oauth2_token.json`, which 0.3 can't read; after upgrading, run `--init` once to create `garmin_tokens.json`.

2. Copy the example config:

```bash
cp -n config.env.example config.env
```

The widget auto-activates `.venv` if present — no need to configure a Python path.

You can keep `GARMIN_EMAIL` and `GARMIN_PASSWORD` in `config.env`, or only pass them during `--init`.

## Initialize the token file

Recommended — prompts for email, password and MFA code, so nothing lands in shell history:

```bash
.venv/bin/python3 fetch-garmin.py --init
```

The command output includes `tokenstore` so you can confirm where tokens were saved.

If you prefer environment/config credentials:

```bash
set -a; . ./config.env; set +a
.venv/bin/python3 fetch-garmin.py --init
```

## Run data fetch manually

```bash
source .venv/bin/activate
python3 fetch-garmin.py
```

This prints JSON payload with current 30-day averages and `tokenstore`.

## Notes

- If MFA is required, `--init` prompts for the code.
- Token refreshes are saved automatically; you should only need `--init` again if Garmin revokes the session.
- Rotate credentials if they were typed in shared terminal history.
