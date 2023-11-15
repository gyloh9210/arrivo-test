-- User table
CREATE TABLE Users (
    UserID INT AUTO_INCREMENT PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    FullName VARCHAR(255) NOT NULL,
    Membership ENUM('Premium', 'Normal') NOT NULL,
    Admin TINYINT NOT NULL DEFAULT 0,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table
CREATE TABLE Categories (
    CategoryID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Activated TINYINT NOT NULL CHECK (Activated IN (0, 1)),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table
CREATE TABLE Posts (
    PostID INT AUTO_INCREMENT PRIMARY KEY,
    Title VARCHAR(255) NOT NULL,
    Body TEXT NOT NULL,
    CategoryID INT,
    Status ENUM('Draft', 'Published', 'Pending Review'),
    Label ENUM('Normal', 'Premium'),
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_Category FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

-- Payments table
CREATE TABLE Payments (
    PaymentID VARCHAR(255) PRIMARY KEY,
    Amount DECIMAL(10, 2),
    PaymentMethod VARCHAR(255),
    Status VARCHAR(255),
    UserID INT,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_User FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
