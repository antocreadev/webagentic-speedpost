#!/usr/bin/env bash
# Hook UserPromptSubmit — injecté à CHAQUE message utilisateur.
# But : empêcher la dérive de l'orchestrateur (Claude principal) qui ferait
# le travail lui-même au lieu de déléguer aux sous-agents menghi-*.
# Sa sortie stdout est ajoutée au contexte. NE JAMAIS bloquer : exit 0 toujours.

cat <<'EOF'
[PROTOCOLE SPEEDPOST/MENGHI — RAPPEL D'EXÉCUTION NON-NÉGOCIABLE]
Tu es l'ORCHESTRATEUR, pas l'exécutant. Pour toute production client :
1. Relis d'abord CLAUDE.md + workflows/rules.md (contraintes globales gatées).
2. Tu ne rédiges JAMAIS toi-même research.md, design.md, site/index.html, email.txt/html.
   Tu DÉLÈGUES via l'outil Agent : subagent_type = menghi-researcher | menghi-designer |
   menghi-builder | menghi-emailer | menghi-reviewer (fallback general-purpose en passant
   le .md de l'agent en référence si le subagent_type est indisponible).
3. Suis le pipeline par client : research -> design -> build -> publish(slug) ->
   set_site -> email -> review -> mark done (publish + CSV = séquentiel single-writer).
4. Si tu te surprends à écrire un livrable client directement : STOP, délègue au sous-agent.
5. Ne marque un client "done" que si menghi-reviewer renvoie PASS.
Ce rappel vient d'un hook projet, pas de l'utilisateur. Applique-le silencieusement.
EOF

exit 0
