CREATE TABLE "pet"(
    pet_id          SERIAL PRIMARY KEY,
    username        VARCHAR(50) UNIQUE NOT NULL,
    pet_type        
    display_name    VARCHAR(100) NOT NULL CHECK (display_name<>''),
    profile_img     VARCHAR,
    email           VARCHAR(100) NOT NULL UNIQUE,
    password        VARCHAR NOT NULL,
    date_joined     TIMESTAMP NOT NULL DEFAULT NOW(),
    dob             DATE,
    CHECK(POSITION('@' IN email) > 1)
);

CREATE TABLE "valid_jwt"(
    token_id        SERIAL PRIMARY KEY,
    pet_id          INTEGER NOT NULL REFERENCES "pet"(pet_id) ON DELETE CASCADE,
    token           VARCHAR NOT NULL
);  

CREATE TABLE "post" (
    post_id         SERIAL PRIMARY KEY,
    pet_id          INTEGER NOT NULL REFERENCES "pet"(pet_id) ON DELETE CASCADE,
    img             VARCHAR,
    post            VARCHAR NOT NULL,
    date_posted     DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE "likes"(
    pet_id          INTEGER NOT NULL REFERENCES "pet"(pet_id) ON DELETE CASCADE,
    post_id         INTEGER NOT NULL REFERENCES "post"(post_id) ON DELETE CASCADE,
    UNIQUE(pet_id, post_id)
);

CREATE TABLE "pet_followed_relationship"(
    pet_id          INTEGER NOT NULL REFERENCES "pet"(pet_id) ON DELETE CASCADE,
    following_id    INTEGER NOT NULL REFERENCES "pet"(pet_id) ON DELETE CASCADE,
    CHECK(pet_id!=following_id)
);

CREATE TABLE "comment"(
    comment_id      SERIAL PRIMARY KEY,
    pet_id          INTEGER NOT NULL,
    post_id         INTEGER NOT NULL,
    comment         VARCHAR NOT NULL CHECK (comment<>''),
    date_posted     DATE NOT NULL DEFAULT NOW()
);

CREATE TABLE "reply"(
    replyId         SERIAL PRIMARY KEY,
    reply           VARCHAR NOT NULL,
    pet_id          INTEGER NOT NULL REFERENCES "pet"(pet_id) ON DELETE CASCADE,
    comment_id      INTEGER NOT NULL REFERENCES "comment"(comment_id) ON DELETE CASCADE,
    date_posted     DATE NOT NULL DEFAULT NOW()
);