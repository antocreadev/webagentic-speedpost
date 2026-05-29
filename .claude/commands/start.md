---
description: Démarre une session pipeline SpeedPost/Menghi en forçant la lecture des règles + la délégation aux sous-agents
---

Tu travailles sur le pipeline SpeedPost/Menghi. AVANT TOUTE CHOSE :

1. Lis `CLAUDE.md` (surtout la section ⛔ PROTOCOLE D'EXÉCUTION) et `workflows/rules.md`, puis confirme-moi en 3 lignes les règles non-négociables que tu retiens.
2. Tu es l'ORCHESTRATEUR, pas l'exécutant. Tu ne rédiges JAMAIS toi-même `research.md`, `design.md`, `site/index.html`, `email.txt` ni `email.html`. Tu DÉLÈGUES systématiquement via l'outil Agent : `subagent_type=menghi-researcher`, puis `menghi-designer`, puis `menghi-builder`, puis (publish + set_site mécaniques), puis `menghi-emailer`, puis `menghi-reviewer`. Fallback `general-purpose` + le `.md` de l'agent si le `subagent_type` est indisponible.
3. Pour chaque client : research → design → build → `publish(slug)` → `set_site` → email → review → mark done. Ne marque "done" que si `menghi-reviewer` renvoie PASS.
4. Si tu te surprends à écrire un livrable client directement : STOP et délègue au sous-agent concerné.
5. Avant de lancer un sous-agent, rappelle-lui dans son prompt de lire `workflows/rules.md` + le brief de son étape.

Commence par l'étape 1 (lecture + confirmation des règles), puis attends mon "go" avant de traiter un client.
