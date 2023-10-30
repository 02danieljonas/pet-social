INSERT INTO "pet" (username, email, password, display_name,dob)
VALUES 
        ('username1', 'email@', 'password', 'jack', '01/02/2003'),
        ('username2', 'email2@', 'password2','steve', '01/03/2003'),
        ('username3', 'email3@', 'password3','Nay', '01/04/2003'),
        ('username4', 'email4@', 'password3','Playful', '01/05/2003');

INSERT INTO "post" (pet_id, post)
VALUES 
        (3, 'I am the 1 post'),
        (1, 'I am the 2 post'),
        (2, 'I am the 3 post'),
        (1, 'I am the 4 post')
        ;

INSERT INTO "likes" (pet_id, post_id)
VALUES 
        (1, 1),
        (1, 2),
        (1, 3),
        (1, 4),
        (2, 4),
        (3, 1)
        ;

INSERT INTO "pet_followed_relationship" (pet_id, following_id)
VALUES 
        (1, 2),
        (2, 3),
        (3, 2),
        (4, 2)
        ;

        
INSERT INTO "comment" (pet_id, post_id, comment)
VALUES 
        (1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec dui eu metus egestas vestibulum. Nunc aliquet libero eget arcu tincidunt eleifend. Maecenas eleifend diam eget ultrices '),
        (1, 1, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur nec dui eu metus egestas vestibulum. Nunc aliquet libero eget arcu tincidunt eleifend. Maecenas eleifend diam eget ultrices pulvinar. Cras vulputate lacus dui, sed rhoncus odio sollicitudin vel. Fusce gravida fermentum lacinia. Nunc efficitur consequat rutrum. Praesent vitae cursus ligula. Vivamus et turpis et nibh porttitor iaculis id vitae diam. Pellentesque eget rutrum ipsum. Aliquam eget quam lectus. Integer mattis justo eget tellus egestas tempus. Sed vitae eros et lectus volutpat vestibulum ut non ligula.'),
        (1, 2, 'sit amet augue sed risus vulputate maximus sed non nisi. Duis at turpis velit. Pellentesque et orci nibh. Vivamus finibus velit nec ante sagittis suscipit. Fusce suscipit vestibulum est, pretium venenatis lacus maximus quis. Sed tincidunt feugiat blandit. Nulla facilisi. Nulla facilisi. Sed facilisis nisl volutpat orci f'),
        (1, 3, 'fringilla ultricies '),
        (1, 4, 'j'),
        (2, 3, 'That''s cool'),
        (3, 4, 'I would never'),
        (4, 1, 'Hey, how''s it going?')
        ;

INSERT INTO "reply" (pet_id, comment_id, reply)
VALUES 
        (4, 1, 'Misinformation!!!!!!'),
        (1, 8, 'I am doing great, how are you?')
        ;