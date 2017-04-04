CREATE TABLE Associates(
id varchar(10) constraint associateId primary key
);

CREATE TABLE SkillCategory(
    category varchar(20) constraint skillCategoryId primary key
);

CREATE TABLE Skills(
    skill varchar(20) constraint skillId primary key,
    category varchar(20) not null
);

ALTER TABLE Skills ADD CONSTRAINT skillToCategory FOREIGN KEY(category) REFERENCES SkillCategory(category);

CREATE TABLE AssociateSkills(
    id varchar(10) not null,
    skill varchar(20) not null,
    dateAdded date not null
);

ALTER TABLE AssociateSkills ADD CONSTRAINT AssociateSkillID PRIMARY KEY(id, skill);

ALTER TABLE AssociateSkills ADD CONSTRAINT AssociateSkillsToAssociate FOREIGN KEY(id) REFERENCES Associates(id);

ALTER TABLE AssociateSkills ADD CONSTRAINT AssociateSkillsToSkills FOREIGN KEY(skill) REFERENCES Skills(skill);

CREATE TABLE Validations(
    validationId varchar(10) constraint validationID primary key,
    beginDate date not null
);

CREATE TABLE ValidationSkills(
    validationId varchar(10) not null,
    skill varchar(20) not null,
    include boolean not null,
    dateAdded date not null
);

ALTER TABLE ValidationSkills ADD CONSTRAINT validationSkillsId PRIMARY KEY(validationId, skill);

ALTER TABLE ValidationSkills ADD CONSTRAINT ValidationSkillsToValidation FOREIGN KEY(validationId) REFERENCES Validations(validationId);

ALTER TABLE ValidationSkills ADD CONSTRAINT ValidationSkillstoSkills FOREIGN KEY(skill) REFERENCES Skills(skill);

CREATE TABLE ValidationAssociates(
    validationId varchar(10) not null,
    id varchar(10) not null, 
    include boolean not null,
    dateAdded date not null
);

ALTER TABLE ValidationAssociates ADD CONSTRAINT validationAssociatesId PRIMARY KEY(validationId, id);

ALTER TABLE ValidationAssociates ADD CONSTRAINT ValidationAssociatesToValidation FOREIGN KEY(validationId) REFERENCES Validations(validationId);

ALTER TABLE ValidationAssociates ADD CONSTRAINT ValidationAssociatestoAssociates FOREIGN KEY(id) REFERENCES Associates(id);

INSERT INTO Associates (id) VALUES('123');
INSERT INTO Associates (id) VALUES('456');
INSERT INTO SkillCategory (category) VALUES('programming');
INSERT INTO SkillCategory (category) VALUES('math');
INSERT INTO SkillCategory (category) VALUES('statistics');
INSERT INTO SkillCategory (category) VALUES('accounting');
INSERT INTO Skills (skill, category) VALUES('Matlab', 'programming');
INSERT INTO Skills (skill, category) VALUES('R', 'programming');
INSERT INTO Skills (skill, category) VALUES('C++', 'programming');
INSERT INTO Skills (skill, category) VALUES('Stochastic Calculus', 'math');
INSERT INTO Skills (skill, category) VALUES('Time Series', 'statistics');
INSERT INTO Skills (skill, category) VALUES('FAS 114', 'accounting');
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('123', 'R', current_date);
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('123', 'FAS 114', current_date);
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('123', 'Time Series', current_date);
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('456', 'R', current_date);
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('456', 'Stochastic Calculus', current_date);
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('456', 'C++', current_date);
INSERT INTO AssociateSkills (id, skill, dateAdded) VALUES ('456', 'Time Series', current_date);

INSERT INTO Validations (validationId, beginDate) VALUES ('1', current_date);