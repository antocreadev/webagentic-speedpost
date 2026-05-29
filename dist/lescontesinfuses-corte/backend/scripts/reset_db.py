"""Reset the SQLite DB and reseed."""
import os
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

if __name__ == "__main__":
    db_path = Path("contes.db")
    if db_path.exists():
        db_path.unlink()
        print(f"Removed {db_path}")
    from app.seed import main
    main()
