export type AlgorithmId = 'linear' | 'polynomial' | 'logistic' | 'pca';

export interface QuestionAnswer {
  id: string;
  question: string;
  answer: string;
  hint: string;
}

export interface AlgorithmData {
  id: AlgorithmId;
  name: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  color: string;
  themeClass: string;
  questions: QuestionAnswer[];
  summary: {
    whatItIs: string;
    whenToUseIt: string;
    advantages: string[];
    limitations: string[];
    realWorldExamples: string[];
  };
}

export const algorithms: Record<AlgorithmId, AlgorithmData> = {
  linear: {
    id: 'linear',
    name: 'Linear Regression',
    description: 'Learn the fundamentals of continuous prediction using the line of best fit.',
    difficulty: 'Beginner',
    color: '#3B82F6', // ml-blue
    themeClass: 'from-blue-500/20 to-blue-900/20 border-blue-500/30',
    questions: [
      { id: 'lr1', question: 'What type of output does Linear Regression predict?', answer: 'Continuous Numerical Values', hint: 'Think about predicting price or temperature.' },
      { id: 'lr2', question: 'What is the primary goal of the model?', answer: 'Line of Best Fit', hint: 'It tries to draw a straight line through the data.' },
      { id: 'lr3', question: 'What do we call the inputs used to make predictions?', answer: 'Independent Variables', hint: 'These are the features (X) you provide to the model.' },
      { id: 'lr4', question: 'What do we call the output being predicted?', answer: 'Dependent Variable', hint: 'This is the target (Y) that depends on the inputs.' },
      { id: 'lr5', question: 'Which formula represents a simple linear model?', answer: 'Y = mX + c', hint: 'The classic equation of a straight line.' },
      { id: 'lr6', question: 'What is a common real-world application?', answer: 'Predicting House Prices', hint: 'Real estate estimation based on square footage.' },
      { id: 'lr7', question: 'What metric is often minimized during training?', answer: 'Mean Squared Error', hint: 'It measures the average squared difference between predictions and actuals.' },
      { id: 'lr8', question: 'What is a key assumption about the data relationship?', answer: 'Linear Relationship', hint: 'The name of the algorithm gives this away.' },
      { id: 'lr9', question: 'How do outliers affect the model?', answer: 'Highly Sensitive', hint: 'A single extreme point can pull the line significantly.' },
    ],
    summary: {
      whatItIs: 'A foundational statistical method used to model the relationship between a dependent variable and one or more independent variables by fitting a linear equation to observed data.',
      whenToUseIt: 'When you need to predict a continuous numerical value (like price, temperature, or sales) and the relationship between variables is roughly linear.',
      advantages: ['Simple to understand and interpret', 'Fast to train', 'Requires minimal tuning'],
      limitations: ['Assumes a linear relationship', 'Sensitive to outliers', 'Prone to underfitting on complex data'],
      realWorldExamples: ['Predicting house prices based on size and location', 'Estimating crop yields based on rainfall', 'Forecasting monthly sales']
    }
  },
  polynomial: {
    id: 'polynomial',
    name: 'Polynomial Regression',
    description: 'Extend linear concepts to capture complex, non-linear relationships with curves.',
    difficulty: 'Intermediate',
    color: '#8B5CF6', // ml-purple
    themeClass: 'from-purple-500/20 to-purple-900/20 border-purple-500/30',
    questions: [
      { id: 'pr1', question: 'What kind of relationship does it model?', answer: 'Non-linear Relationships', hint: 'Not a straight line.' },
      { id: 'pr2', question: 'What parameter controls the complexity of the curve?', answer: 'Polynomial Degree', hint: 'Power of the X variable (e.g., X^2, X^3).' },
      { id: 'pr3', question: 'What is the visual shape of a degree 2 polynomial?', answer: 'Curved Trend (Parabola)', hint: 'Think of a U-shape.' },
      { id: 'pr4', question: 'What type of output does it predict?', answer: 'Continuous Output', hint: 'Similar to Linear Regression.' },
      { id: 'pr5', question: 'What happens if the degree is set too high?', answer: 'Overfitting', hint: 'The curve hits every point but generalizes poorly.' },
      { id: 'pr6', question: 'What is a common use case?', answer: 'Epidemic Growth Modeling', hint: 'Modeling something that accelerates over time.' },
      { id: 'pr7', question: 'What is a key advantage over linear regression?', answer: 'Fits Complex Data Better', hint: 'It can bend to follow the data.' },
      { id: 'pr8', question: 'What is a major limitation when extrapolating?', answer: 'Wild Predictions Outside Data', hint: 'The curve shoots off unpredictably beyond the training points.' },
      { id: 'pr9', question: 'How is it mathematically trained?', answer: 'As a Multiple Linear Model', hint: 'It treats X^2 and X^3 as new independent variables.' },
    ],
    summary: {
      whatItIs: 'A form of regression analysis in which the relationship between the independent variable x and the dependent variable y is modeled as an nth degree polynomial in x.',
      whenToUseIt: 'When the data shows a clear curve and a straight line (Linear Regression) is underfitting the data.',
      advantages: ['Can model non-linear relationships', 'Provides a better fit for complex datasets'],
      limitations: ['Highly prone to overfitting with high degrees', 'Extrapolation is very unreliable', 'Sensitive to outliers'],
      realWorldExamples: ['Modeling population growth', 'Predicting the spread rate of diseases', 'Analyzing the relationship between driving speed and fuel efficiency']
    }
  },
  logistic: {
    id: 'logistic',
    name: 'Logistic Regression',
    description: 'Master binary classification using probability and the sigmoid function.',
    difficulty: 'Advanced',
    color: '#10B981', // ml-green
    themeClass: 'from-green-500/20 to-green-900/20 border-green-500/30',
    questions: [
      { id: 'log1', question: 'What is the primary task of Logistic Regression?', answer: 'Classification', hint: 'It categorizes data rather than predicting continuous values.' },
      { id: 'log2', question: 'What type of outcomes does standard logistic regression handle?', answer: 'Binary Outcomes (0 or 1)', hint: 'Yes/No, True/False, Spam/Not Spam.' },
      { id: 'log3', question: 'What mathematical function maps predictions to probabilities?', answer: 'Sigmoid Function', hint: 'An S-shaped curve.' },
      { id: 'log4', question: 'What is the typical range of the output?', answer: 'Probability Output (0 to 1)', hint: 'It acts as a percentage chance.' },
      { id: 'log5', question: 'What separates the different classes in the feature space?', answer: 'Decision Boundary', hint: 'The line drawn in the sand to separate categories.' },
      { id: 'log6', question: 'What is a classic real-world example?', answer: 'Email Spam Detection', hint: 'Filtering your inbox.' },
      { id: 'log7', question: 'What do we call the categories being predicted?', answer: 'Labels or Classes', hint: 'The categories you are trying to assign.' },
      { id: 'log8', question: 'What is used to convert probabilities into final predictions?', answer: 'Decision Threshold (e.g., 0.5)', hint: 'The cutoff point where 0 becomes 1.' },
      { id: 'log9', question: 'What metric is minimized during training?', answer: 'Log Loss (Cross-Entropy)', hint: 'It measures the difference between predicted probabilities and actual labels.' },
    ],
    summary: {
      whatItIs: 'A statistical model used for classification that uses a logistic function to model a binary dependent variable, returning the probability that an instance belongs to a given class.',
      whenToUseIt: 'When you need to categorize data into two distinct classes (binary classification), and you also want to know the probability of the prediction.',
      advantages: ['Outputs clear probabilities', 'Efficient to train', 'Less prone to overfitting in low-dimensional spaces'],
      limitations: ['Assumes linear decision boundary', 'Not suited for non-linear problems without feature engineering', 'Can struggle with highly correlated inputs'],
      realWorldExamples: ['Spam vs. Ham email filtering', 'Predicting if a customer will churn (cancel subscription)', 'Diagnosing a disease (Malignant vs. Benign)']
    }
  },
  pca: {
    id: 'pca',
    name: 'Principal Component Analysis (PCA)',
    description: 'Understand how to simplify high-dimensional data while preserving variance.',
    difficulty: 'Expert',
    color: '#F97316', // ml-orange
    themeClass: 'from-orange-500/20 to-orange-900/20 border-orange-500/30',
    questions: [
      { id: 'pca1', question: 'What is the main purpose of PCA?', answer: 'Dimensionality Reduction', hint: 'Making the dataset smaller in width.' },
      { id: 'pca2', question: 'What does PCA attempt to reduce?', answer: 'Feature Count', hint: 'The number of columns/variables.' },
      { id: 'pca3', question: 'What are the new variables created by PCA called?', answer: 'Principal Components', hint: 'The name of the algorithm.' },
      { id: 'pca4', question: 'What property of the data does PCA try to maximize?', answer: 'Variance', hint: 'The spread or information content of the data.' },
      { id: 'pca5', question: 'What type of data is PCA typically applied to?', answer: 'High-dimensional Data', hint: 'Datasets with many, many features.' },
      { id: 'pca6', question: 'What is a common visual application of PCA?', answer: 'Data Visualization (3D to 2D)', hint: 'Plotting complex data on a flat screen.' },
      { id: 'pca7', question: 'What is a practical benefit for storage and speed?', answer: 'Data Compression', hint: 'Making files smaller and models faster.' },
      { id: 'pca8', question: 'What process describes creating new features from old ones?', answer: 'Feature Extraction', hint: 'Pulling out the most important combinations of data.' },
      { id: 'pca9', question: 'What is a common real-world application?', answer: 'Facial Recognition (Eigenfaces)', hint: 'Identifying people from images.' },
    ],
    summary: {
      whatItIs: 'An unsupervised machine learning technique that transforms a large set of variables into a smaller one that still contains most of the information in the large set.',
      whenToUseIt: 'When dealing with hundreds of features and you need to reduce complexity for faster training, or when you need to visualize multi-dimensional data in 2D or 3D.',
      advantages: ['Reduces noise and prevents overfitting', 'Speeds up training times of other algorithms', 'Enables visualization of complex data'],
      limitations: ['Principal components are hard to interpret', 'Information (variance) is always lost to some degree', 'Requires feature scaling (standardization) before applying'],
      realWorldExamples: ['Image compression', 'Genomics and DNA microarray analysis', 'Pre-processing step for complex deep learning models']
    }
  }
};
