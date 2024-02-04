---
layout: post
title:  "Steps to Create a Java Project on Github"
date:   2024-02-04 04:40:18 -0500
categories: jekyll update
author: Steven Kang
---

Github is a platform that allows developers to create, store, manage and share their code. It is one of the most popular social networking sites where developers openly network, collaborate, and pitch their work. However, as a beginner, navigating Github can be quite a challenge for someone who has never been introduced to it. In this blog, you will learn how to create a Java project on Github with an easy step by step guide. 


1. Install [Visual Studio Code](https://code.visualstudio.com) and its Java extension on your machine. 

2. Create a Github account. 

3. Create a new repository on Github and choose Java language. 

    ![image-title-here](/assets/images/create-github-project.png){:class="img-responsive"}

4. Clone project from Github to local machine. 

    ![image-title-here](/assets/images/git-clone-command.png){:class="img-responsive"}


    ```bash
        git clone git@github.com:your-github-account/your-project-name.git
    ```

5. Open your project in Visual Studio Code and add some java code;


    ```Java
    public class Main {
        public static void main(String[] args) throws Exception {
            System.out.println("hello world");
        }
    }
    ```

6. Push your change to Github. 

    ```bash
    git add .
    git commit . -m "any message you like"
    git push 
    ```

7. Verify your changes on Github. 