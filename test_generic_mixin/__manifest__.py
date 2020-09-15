{
    'name': "Generic Mixin (Tests)",
    'summary': """
        Technical module that have to be used to test Generic Mixin module
    """,
    'author': "Center of Research and Development",
    'website': "https://crnd.pro",
    'category': 'Hidden',
    'version': '11.0.0.3.0',
    'depends': [
        'generic_mixin',
    ],
    'data': [
        'security/ir.model.access.csv',
    ],
    'demo': [
        'demo/test_track_changes.xml',
        'demo/test_noupdate_on_write.xml',
    ],
    'images': ['static/description/banner.png'],
    'installable': True,
    'application': False,
    'license': 'LGPL-3',
}