# Agent System

Small web agency simulated as Claude Code subagents. One PM, five role leads, stochastic consensus inside each lead.

## How to initiate a request

Talk to `project-manager`. Only. No other agent responds to you directly. PM clarifies, delegates to leads, and reports back.

## Output format

PM returns options, not recommendations. Each option lists tradeoffs and any scope flag against `project-memory/scope.md`. PM cites the leads it consulted. Each lead cites the personas it consulted. You decide; PM logs the decision.

## Where decisions get logged

`project-memory/decisions-log.md`. Append-only, newest on top. Every entry records date, decision, rationale, and scope impact.

## Updating scope

`project-memory/scope.md` is the contract. PM does not edit it without your explicit approval. When you approve a change, PM updates `scope.md` and adds a matching entry to `decisions-log.md`.

## Client-facing drafts

PM drafts, you send. Drafts live in `project-memory/client-comms/drafts/YYYY-MM-DD-<topic>.md`. After you approve and send, PM moves the file to `project-memory/client-comms/sent/` and logs the exchange in `project-memory/client-history.md`.

## Voice matching

Paste 2-3 real client emails into `project-memory/voice-guide.md`. PM reads it before every draft.
