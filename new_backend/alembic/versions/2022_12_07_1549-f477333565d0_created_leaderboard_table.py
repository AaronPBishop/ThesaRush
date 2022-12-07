"""Created LeaderBoard table

Revision ID: f477333565d0
Revises: a87c0a065d3d
Create Date: 2022-12-07 15:49:30.465512

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f477333565d0'
down_revision = 'a87c0a065d3d'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "leaderboard",
        sa.Column("league", sa.String(40), primary_key=True),
    )


def downgrade() -> None:
    op.drop_table("leaderboard")
