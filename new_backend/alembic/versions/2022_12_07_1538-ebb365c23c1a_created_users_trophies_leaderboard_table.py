"""Created users table

Revision ID: ebb365c23c1a
Revises: 
Create Date: 2022-12-07 15:38:24.482782

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ebb365c23c1a'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "users",
        sa.Column("id", sa.Integer, primary_key=True),
        sa.Column("user_name", sa.String(14), nullable=False),
        sa.Column("user_email", sa.String(250), nullable=False),
        sa.Column("user_password", sa.String(20), nullable=False),
        sa.Column("points", sa.Integer),
        sa.Column("points_balance", sa.Integer),
        sa.Column("words", sa.Integer),
        sa.Column("longest_word", sa.String(40)),
        sa.Column("tiles_cleared", sa.Integer),
        sa.Column("badges", sa.Integer),
        sa.Column("lives", sa.Integer),
    )


def downgrade() -> None:
    op.drop_table("users")
