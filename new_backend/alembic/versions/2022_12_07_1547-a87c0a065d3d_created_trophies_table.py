"""Created Trophies table

Revision ID: a87c0a065d3d
Revises: ebb365c23c1a
Create Date: 2022-12-07 15:47:09.673145

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a87c0a065d3d'
down_revision = 'ebb365c23c1a'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "trophies",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("trophy_name", sa.String(100)),
        sa.Column("user_id", sa.Integer, sa.ForeignKey('users.id'), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("trophies")
